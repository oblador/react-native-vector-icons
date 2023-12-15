FROM debian:11-slim

WORKDIR /usr/src/app

RUN apt-get -y update \
  && apt-get -y upgrade \
  && apt-get -y --no-install-recommends install fontcustom \
  && apt clean \
  && rm -rf /var/lib/apt/lists/*

ENTRYPOINT ["/usr/bin/fontcustom"]
