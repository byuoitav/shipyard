FROM grc.io/distroless/static
LABEL Brayden Winterton <brayden_winterton@byu.edu>

ARG NAME

COPY ${NAME} /shipyard
COPY ui /ui

ENTRYPOINT ["/shipyard"]