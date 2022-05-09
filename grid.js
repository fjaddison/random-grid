let palette = [
    '#BFA865',
    '#5A8BA4',
    '#B93B56',
    '#7FB1C1',
    '#C7C8CC',
    '#648E8D',
    '#95455E',
    '#09246A'
]

let grid = []
let rects = []
let padding = 1
let rows
let cols
let scl

function setup() {
    createCanvas(500, 500)
    scl = width * 0.05
    rows = height / scl
    cols = width / scl
    for (let row = padding; row < rows - padding; row++) {
        let rowValues = []
        for (let col = padding; col < cols - padding; col++) {
            rowValues.push(true)
        }
        grid.push(rowValues)
    }
    fillMajority(1.5)
    fillMajority(3)
    fillRemainder()
}

function draw() {
    background(255)
    strokeWeight(3)
    rects.forEach(rec => {
        fill(random(palette))
        rect((rec.c + padding) * scl, (rec.r + padding) * scl, rec.w * scl, rec.h * scl)
    })

    noLoop()
}

function fillMajority(divisor) {
    let count = 0
    while(count < 1000) {
        let randRow = round(random(rows - (padding * 2) - 1))
        let randCol = round(random(cols - (padding * 2) - 1))
        let randHeight = round(random(1, (rows - padding - randRow) / divisor))
        let randWidth = round(random(1, (cols - padding - randCol) / divisor))
        if (fits(randRow, randCol, randHeight, randWidth)) {
            occupy(randRow, randCol, randHeight, randWidth)
            let newRect = new RectInfo(randRow, randCol, randHeight, randWidth)
            rects.push(newRect)
        }
        count++
    }
}

function fillRemainder() {
    for(let row = 0; row < rows - (padding * 2); row ++) {
        for (let col = 0; col < cols - (padding * 2); col++) {
            if (grid[row][col] == true) {
                let newRect = new RectInfo(row, col, 1, 1)
                rects.push(newRect)
            }
        }
    }
}

function fits(r, c, h, w) {
    for (let row = r; row < r + h; row++) {
        for (let col = c; col < c + w; col++) {
            if (grid[row][col] == false) {
                return false
            }
        }
    }
    return true
}

function occupy(r, c, h, w) {
    for (let row = r; row < r + h; row++) {
        for (let col = c; col < c + w; col++) {
            grid[row][col] = false
        }
    }
    return true
}

class RectInfo {
    constructor(r, c, h, w) {
        this.r = r
        this.c = c
        this.h = h
        this.w = w
    }
}
