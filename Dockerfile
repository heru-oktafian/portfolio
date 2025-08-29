FROM ruby:3.3-alpine

# Install dependency OS untuk Rails + Ruby gems
RUN apk update && apk add --no-cache \
    build-base \
    yaml-dev \
    sqlite-dev \
    tzdata \
    nodejs \
    yarn \
    git

# Set working directory
WORKDIR /app

# Salin Gemfile terlebih dahulu untuk memanfaatkan caching
COPY Gemfile Gemfile.lock ./

# Install bundler
RUN gem install bundler

# Install semua gem kecuali development dan test
RUN bundle config set --local without 'development test' \
    && bundle install --jobs 4 --retry 3

# Salin seluruh aplikasi Rails
COPY . .

# Set environment ke production
ENV RAILS_ENV=production
ENV RACK_ENV=production

ENV SECRET_KEY_BASE=dummy_secret_key_base

# Precompile assets (agar Rails siap jalan di production)
RUN bundle exec rake assets:precompile

# Expose port 3000 (Rails default)
EXPOSE 3000

# Jalankan server Rails dalam mode production
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0", "-p", "3000", "-e", "production"]
