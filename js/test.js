var ಠ_ಠ = 2;

for (var i = 0; i < 10; i++) {
    ಠ_ಠ++;
    console.log("We have " + ಠ_ಠ);
}

class Banana {
    log = 0;
    death = "burnage";

    constructor(log, death) {
        this.log = log;
        this.death = death;
    }

    grab() {
        log++;
    }

    change(death) {
        this.death = death;
    }
}

var banana = Banana.constructor(32, "leverage");
banana.death = "help";
console.log("There is change in " + banana);
banana.change("grapefruit");
banana.grab();

console.log("Is this any " + banana);