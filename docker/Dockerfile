ARG PHP_VERSION="8.2"

FROM php:${PHP_VERSION}-fpm

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

COPY docker/app/php.ini $PHP_INI_DIR/conf.d/

# Install Composer
RUN curl -sS https://getcomposer.org/composer-stable.phar -o /usr/local/bin/composer && chmod +x /usr/local/bin/composer

# Install Node.js and npm (Stable LTS version)
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    npm cache clean --force && \
    npm --version && node --version

WORKDIR /var/www/app

COPY . /var/www/app

RUN composer update

# Install project dependencies
RUN npm install --legacy-peer-deps && npm install react react-dom && npm run build


ADD docker/app/supervisor.conf /etc/supervisor/conf.d/worker.conf
RUN mkdir -p /var/run/supervisor

EXPOSE 9000

CMD ["supervisord", "-n", "-c", "/etc/supervisor/supervisord.conf"]
