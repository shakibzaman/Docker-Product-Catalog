# Define PHP version as an argument
ARG PHP_VERSION="8.2"

# Use PHP FPM base image
FROM php:${PHP_VERSION}-fpm

# Install PHP dependencies
RUN apt-get update && apt-get -y --no-install-recommends install \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libz-dev \
    libssl-dev \
    zip \
    unzip \
    supervisor \
    redis-server \
    && apt-get autoremove --purge -y && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Install Redis PHP Extension
RUN pecl channel-update pecl.php.net && pecl install redis && docker-php-ext-enable redis

# Install PHP extensions
RUN docker-php-ext-install -j$(nproc) \
    opcache \
    intl \
    pdo_mysql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    sockets

# Copy custom PHP configuration
COPY docker/app/php.ini $PHP_INI_DIR/conf.d/

# Install Composer
RUN curl -sS https://getcomposer.org/composer-stable.phar -o /usr/local/bin/composer && chmod +x /usr/local/bin/composer

# Install Node.js (LTS version)
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    npm cache clean --force && \
    npm --version && node --version

# Set working directory
WORKDIR /var/www/app

# Copy Laravel project files into container
COPY . /var/www/app

# Install Composer dependencies (Laravel)
RUN composer install --no-dev --optimize-autoloader

# Install Node.js dependencies (React, Tailwind, Vite, etc.)
RUN npm install --legacy-peer-deps

# Run npm build to compile assets (Tailwind, React, etc.)
RUN npm run build

# Ensure Vite is installed
RUN npm install vite

# Expose necessary ports (PHP-FPM and Vite port)
EXPOSE 9000
EXPOSE 5173

# Set up Supervisor (if needed for running processes like queues)
ADD docker/app/supervisor.conf /etc/supervisor/conf.d/worker.conf
RUN mkdir -p /var/run/supervisor

# Command to run PHP-FPM and Vite in parallel
CMD ["sh", "-c", "supervisord -n -c /etc/supervisor/supervisord.conf & npm run dev"]

