FROM debian:11-slim

WORKDIR /usr/src/app

# NOTE: Use this again if fontforge does a new release
# RUN apt-get -y update \
#   && apt-get -y upgrade \
#   && apt-get -y --no-install-recommends install fontcustom \
#   && apt clean \
#   && rm -rf /var/lib/apt/lists/*

RUN apt-get -y update \
  && apt-get -y upgrade \
  && apt-get -y --no-install-recommends install \
  fontcustom \
  libjpeg-dev libtiff5-dev libpng-dev libfreetype6-dev libgif-dev libgtk-3-dev libxml2-dev \
  libpango1.0-dev libcairo2-dev libspiro-dev libwoff-dev python3-dev ninja-build cmake build-essential gettext \
  git ca-certificates \
  && apt clean \
  && rm -rf /var/lib/apt/lists/*

RUN git clone https://github.com/fontforge/fontforge.git
RUN mkdir fontforge/build

WORKDIR /usr/src/app/fontforge/build

RUN cmake -GNinja .. \
  && ninja \
  && ninja install \
  && cd ../.. \
  && rm -rf /usr/src/app/fontforge

RUN dpkg -r --force-depends fontforge

WORKDIR /usr/src/app

ENTRYPOINT ["/usr/bin/fontcustom"]
