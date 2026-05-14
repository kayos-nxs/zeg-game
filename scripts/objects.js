const TILE_SIZE = 80;

class Map {

    rows=14;
    cols=14;

    map1 = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ]

    loadMap(map) {
        for (let i = 0; i<this.rows; i++) {
            for (let j = 0; j<this.cols; j++) {
                if (map[i][j] === 1) {
                    ctx.fillStyle = "black";
                } else {
                    ctx.fillStyle = "silver";
                }

                ctx.fillRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
        }
    }
}

class Entity {
    x;
    y;
    hp;
    w;
    h;

    constructor(x,y,hp,w,h) {
        this.x = x;
        this.y = y;
        this.hp = hp;
        this.w = w;
        this.h = h;
    }
}

class Player extends Entity {
    items=[];

    constructor(x,y,hp,w,h,items) {
        super(x,y,hp,w,h);
        this.items = items;
    }
}