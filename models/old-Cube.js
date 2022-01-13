const uniqId = require('uniqid')

class Cube {
    constructor(name, description, imageUrl, difficulty) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.difficulty = Number(difficulty);
        this.id = uniqId()
    }
}

module.exports = Cube;