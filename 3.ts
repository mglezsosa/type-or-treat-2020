// Dang, COVID19 has really put a bind on the nature of trick or treating.
// Your block has opt-ed to instead do a trunk or treat instead.

// In a rush to prepare for the event, you hardcoded the
// results into the 'TrunkOrTreatResults' type which is already
// out of date - it's missing a few properties!
// Can you rewrite 'TrunkOrTreatResults' as an object type that
// stays in sync with the strings in 'trunkOrTreatSpots'?

const trunkOrTreatSpots = [
    'The Park',
    'House #1',
    'House #2',
    'Corner Shop',
    'Place of Worship',
] as const

// Old version:
// type TrunkOrTreatResults = {
//     "The Park": {
//         done: boolean,
//         who: string,
//         loot: Record<string, any>
//     },
//     "House #1" : {
//         done: boolean,
//         who: string,
//         loot: Record<string, any>
//     },
//     "House #2": {
//         done: boolean,
//         who: string,
//         loot: Record<string, any>
//     }
// }

// New version
type Result = { done: boolean, who: string, loot: Record<string, any> }
type TrunkOrTreatResults = { [K in typeof trunkOrTreatSpots[number]]: Result }

function makeTODO(spots: typeof trunkOrTreatSpots): TrunkOrTreatResults {
    return spots.reduce((prev, current) => {
        return {
            ...prev,
            [current]: {
                done: false,
                loot: {},
                who: ""
            }
        }
    }, {} as TrunkOrTreatResults)
}

// You can preview the results via "Run" above

const todo = makeTODO(trunkOrTreatSpots)
console.log(todo)

// Works
todo["The Park"].done = true

// Should Work
todo["Corner Shop"].loot = {}

// Fails
todo["House #3"].done = false

// Spoiler-ish optional tips are a few lines below this 











// Warning: Spoilers


// 1. This is a mapped types problem





// 2. There is a constraint on the mapped type argument





// 3. You can re-use a part of the technique from the beginner challenge 1 to get the exact keys from
//    the array: https://dev.to/typescript/type-treat-challenge-2-3n16