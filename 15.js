$(function () {
    let tileWidth;
    let tileHeight;
    const tiles = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, null]
    ];

    let gapX = 3;
    let gapY = 3;

    const MARGIN = 2;
    const BORDER = 1;

    function slideTile(tile, duration) {
        tile.animate({
            top: tile.data('y') * tileHeight,
            left: tile.data('x') * tileWidth
        }, duration || 200);
    }

    function down() {
        if (gapY > 0) {
            const tile = tiles[gapY - 1][gapX];
            tiles[gapY][gapX] = tile;

            tile.data('y', gapY);
            slideTile(tile);

            gapY = gapY - 1;
            tiles[gapY][gapX] = null;
        }
    }

    function up() {
        if (gapY < 3) {
            const tile = tiles[gapY + 1][gapX];
            tiles[gapY][gapX] = tile;

            tile.data('y', gapY);
            slideTile(tile);

            gapY = gapY + 1;
            tiles[gapY][gapX] = null;
        }
    }

    function right() {
        if (gapX > 0) {
            const tile = tiles[gapY][gapX - 1];
            tiles[gapY][gapX] = tile;

            tile.data('x', gapX);
            slideTile(tile);

            gapX = gapX - 1;
            tiles[gapY][gapX] = null;
        }
    }

    function left() {
        if (gapX < 3) {
            const tile = tiles[gapY][gapX + 1];
            tiles[gapY][gapX] = tile;

            tile.data('x', gapX);
            slideTile(tile);

            gapX = gapX + 1;
            tiles[gapY][gapX] = null;
        }
    }

    function positionTiles() {
        for (let x = 0; x < 4; x++) {
            for (let y = 0; y < 4; y++) {
                const tile = tiles[y][x];
                if (tile) {
                    tile.css({
                        top: tile.data('y') * tileHeight,
                        left: tile.data('x') * tileWidth
                    });
                }

            }
        }
    }

    function resize() {
        // console.log($(window).width(), $(window).height());

        const margin = parseInt($("body").css("margin")) || 0;
        const windowWidth = $(window).width() - 2 * margin;
        const windowHeight = $(window).height() - 2 * margin;

        tileWidth = Math.floor(windowWidth / 4);
        tileHeight = Math.floor(windowHeight / 4);

        const fontSize = Math.min(tileWidth, tileHeight);

        const extra = 2 * (MARGIN + BORDER);
        $('.tile')
            .width(tileWidth - extra)
            .height(tileHeight - extra)
            .css('fontSize', (.8 * fontSize) + 'px')
            .css('borderRadius', .05 * tileWidth);

        positionTiles();
    }

    function initTiles() {
        const board = $('#board');
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                const value = y * 4 + x + 1;
                if (value < 16) {
                    const tile = $('<div class="tile">' + value + '</div>');
                    board.append(tile);
                    tile.data('x', x).data('y', y);
                    tiles[y][x] = tile;
                    if (x % 2) {
                        tile.css('backgroundColor', 'pink');
                    } else {
                        tile.css('backgroundColor', 'lightgreen');
                    }
                }

            }
        }
    }

    function scramble() {
        for (let i = 0; i < 100; i++) {
            const r = Math.random();
            if (r < .25) {
                up();
            } else if (r < .5) {
                down();
            } else if (r < .75) {
                left();
            } else {
                right();
            }
        }
    }

    function keydown(event) {
        // console.log(event.which);

        switch (event.which) {
            case 38:
                up();
                break;
            case 37:
                left();
                break;
            case 39:
                right();
                break;
            case 40:
                down();
                break;
            default:
                break;
        }
        event.stopPropagation();
        event.preventDefault();
    }

    return function (evt) {
        $(window).resize(resize);
        $(document).keydown(keydown);
        initTiles();
        resize();
        scramble();
    };
}());
