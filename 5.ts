// You're part of a team scheduling a movie night, but someone accidentally
// considered the movie "The Nightmare Before Christmas" to be a halloween 
// movie, which it really isn't.

const moviesToShow = {
    halloween: { forKids: false },
    nightmareOnElmStreet: { forKids: false },
    hocusPocus: { forKids: true },
    theWorstWitch: { forKids: true },
    sleepyHollow: { forKids: false }
} as const

// They got away with this travesty because you have some `any`s in the 
// codebase for creating the scheduler. An OK call for a first pass, but
// we're sharing code with others and want to be explicit.

type AllMovies = keyof typeof moviesToShow;
type MovieActionsPrefixes = 'getVHSFor' | 'makePopcornFor' | 'play'
type Scheduler<A extends AllMovies> = Record<`${MovieActionsPrefixes}${capitalize A}`, () => void>

function prefix<T extends `${capitalize AllMovies}`, K extends MovieActionsPrefixes>(
    strings: [K],
    capitalName: T):
    `${K}${T}` {
    return `${strings[0]}${capitalName}` as any;
}

function makeScheduler(movies: typeof moviesToShow) {
    // - const schedule = {} as any
    const schedule: Scheduler<AllMovies> = {} as any
    for (const movie in Object.keys(movies)) {
        const capitalName = movie.charAt(0).toUpperCase() + movie.slice(1);

        schedule[`getVHSFor${capitalName}`] = () => { }
        schedule[`makePopcornFor${capitalName}`] = () => { }
        schedule[`play${capitalName}`] = () => { }
    }

    return schedule
}

// Creates a scheduler
const movieNight = makeScheduler(moviesToShow)

// Then all these functions are automatically created 
movieNight.getVHSForHalloween()
movieNight.makePopcornForHalloween()
movieNight.playHalloween()

// Not a halloween movie! This should be a compiler error
movieNight.getVHSForNightmareBeforeChristmas()
movieNight.makePopcornForNightmareBeforeChristmas()
movieNight.playNightmareBeforeChristmas()

movieNight.getVHSForHocusFocus()
movieNight.makePopcornForHocusPocus()
movieNight.playHocusPocus()



// Spoilers and part 2 of this challenge are below









// Clue 1. This challenge builds off the last one, which builds off
// the last one, etc...








// Clue 2. These stringly typed function names can probably be handled 
// with a new feature from TypeScript 4.1











// **Part two**

// You have the code to organize the same schedule, but with only kids movies.
// It'd be great if you could apply the same types - but only when a movie
// has been declared to be a kids movie.

type KidsMovies = { [K in AllMovies]: typeof moviesToShow[K] extends { forKids: true } ? K : never }[AllMovies]

function makeKidScheduler(movies: typeof moviesToShow) {
    const schedule: Scheduler<KidsMovies> = {} as any
    for (const movie in Object.keys(movies)) {
        // @ts-ignore
        if (moviesToShow[movie].forKids) {
            const capitalName = movie.charAt(0).toUpperCase() + movie.slice(1);

            schedule[`getVHSFor${capitalName}`] = () => { }
            schedule[`makePopcornFor${capitalName}`] = () => { }
            schedule[`play${capitalName}`] = () => { }
        }
    }

    return schedule
}

// Then when we have an object which uses these types
const kidsMovieNight = makeKidScheduler(moviesToShow)

// Should fail
kidsMovieNight.getVHSForHalloween()
kidsMovieNight.playHalloween()

// Should pass
kidsMovieNight.getVHSForHocusFocus()
kidsMovieNight.makePopcornForHocusPocus()
kidsMovieNight.playHocusPocus()




// Spoiler clues below







// 1. You can re-use your template literal types, but you need a new mapped type.









// 2. Finding the right spot for your conditional is tricky, but there aren't too many positions
//    where you can use them.









// 3. You may need to apply additional contraints to your mapped type from the first one
