// Your kids have returned home with a whole bag
// full of halloween loot, and you've taken the time to 
// make a description of all of them:

type SnackBars = {
    name: "Short Chocolate Bars"
    amount: 4
    candy: true
}

type Gumballs = {
    name: "Gooey Gumballs"
    color: "green" | "purples"
    candy: true
}

type Apples = {
    name: "Apples"
    candy: true
}

type Cookies = {
    name: "Cookies"
    candy: true
    peanuts: true
}

type SnickersBar = {
    name: "Snickers Bar"
    candy: true
    peanuts: true
}

type Toothpaste = {
    name: "Toothpaste"
    minty: true
    trick: true
}

type Pencil = {
    name: "Pencil"
    trick: true
}

// You create a single pile of all the results, and want to use
// this to share out the winnings among your kids. 

type ResultsFromHalloween = SnackBars | Gumballs | Apples | SnickersBar | Cookies | Toothpaste | Pencil

// You're first going to need to separate out the candy from the treats,
// you can do that via conditional types.

type AllCandies = Extract<ResultsFromHalloween, { candy: true }>
type AllTricks = Extract<ResultsFromHalloween, { trick: true }>

// Almost there, but little 'Bobby Tables' cannot have peanuts. Can
// you make a list of candies just for him?

type AllCandiesWithoutPeanuts = Exclude<AllCandies, { peanuts: true }>
