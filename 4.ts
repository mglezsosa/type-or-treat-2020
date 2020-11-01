// You got roped into the cutest halloween competition, judging
// doggy halloween pet costumes at the annual parade. 

declare function decideWinner(breed: string, costume: string): { name: string, video: string }
window.decideWinner = someoneElseDecides

// Oh, actually you didn't - someone else got to do the fun bit...
// Though you can watch it on zoom: http://www.tompkinssquaredogrun.com/halloween

// Instead, you've been asked to help tally up a scoreboard of the most 
// popular costumes according to the most popular breeds. You've built
// out a quick implementation below, but it loses type information.

// Now the contest is over, you feel it's your duty to refactor this
// code to retain type information - you've heard that the 4.1 beta includes
// something which helps with typing string manipulation.

const breeds = ["Hound", "Corgi", "Pomeranian"] as const
const costumes = ["Pumpkin", "Hot Dog", "Bumble Bee"] as const

type Lowercase<T extends string> = `${lowercase T}`

function createBreedCostumeId(breed: typeof breeds[number], costume: typeof costumes[number]) {
    return `${breed}-${costume}`.toLowerCase() as Lowercase<`${typeof breed}-${typeof costume}`>
}

function tallyPopularWinners(_breeds: typeof breeds, _costumes: typeof costumes) {
    const winners: Record<
        ReturnType<typeof createBreedCostumeId>,
        ReturnType<typeof decideWinner>
    > = {} as any

    for (const breed of _breeds) {
        for (const costume of _costumes) {
            const id = createBreedCostumeId(breed, costume)
            winners[id] = decideWinner(breed, costume)
        }
    }

    return winners
}

// You can run this example in order to see what the shape of the data looks like, but
// the result will have keys which are lowercased for every mix of breed and costume, e.g:

// {
//     "hound-pumpkin": {...},
//     "hound-hot dog": {...},
//     "hound-bumble bee": {...},
//     "corgi-pumpkin": {...}
//     ...
// }

const winners = tallyPopularWinners(breeds, costumes)
console.log(winners)

// Passes
winners["hound-pumpkin"].name

// Should fail
winners["pumpkin-pumpkin"].video

// Spoilerific tips below:












// 1: This builds off ideas from day 3, which builds of previous days too





// 2: The implementation will require an `as` or two alas, but with some
//    work you can partially find an answer








// Mainly just adding a quick implementation, so that you can run the 
// code above without a problem:

function someoneElseDecides(_breed: string, _costume: string): { name: string, video: string } {
    // Yes, all these dogs have a name which is just a hexcode... hah
    const genRanHex = (size: number) => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    return {
        name: genRanHex(6),
        video: genRanHex(6)
    }
}