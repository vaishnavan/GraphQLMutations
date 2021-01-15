const graphql = require('graphql');
const _ = require('lodash');
const Movie = require('../model/movie');
const Song = require('../model/song');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLSchema,
} = graphql;
// dummy data
// var movies = [
//     { id: "1", movieName: "petta", hero: "Rajini", director: 'karthik subraj' },
//     { id: "2", movieName: "master", hero: "vijay", director: 'lokesh kanagaraj' },
//     { id: "3", movieName: "eswaran", hero: "simbu", director: 'susindharan' },
//     { id: "4", movieName: "yaradi nee mohini", hero: "dhanush", director: 'ram kannan' },
//     { id: "5", movieName: "maan karate", hero: "sivakarthikeyan", director: 'venuu' }
// ]

// var songs = [
//     { id: "1", song: "polakattum para para", movieId: "2" },
//     { id: "2", song: "vathi coming", movieId: "2" },
//     { id: "3", song: "kutty story", movieId: "2" },
//     { id: "4", song: "Quit pannuda", movieId: "2" },
//     { id: "5", song: "petta parak", movieId: "1" },
//     { id: "6", song: "elamai thiruthe", movieId: "1" },
//     { id: "7", song: "eswaran vandhutan", movieId: "3" },
//     { id: "8", song: "mangalam", movieId: "3" },
//     { id: "9", song: "enkayo patha mayakam", movieId: "4" },
//     { id: "10", song: "oru nalaikul", movieId: "4" },
//     { id: "11", song: "darling dabaku", movieId: "5" },
//     { id: "11", song: "royapuram peteru", movieId: "5" }
// ]

const MovieType = new GraphQLObjectType({
    name: 'movies',
    fields: () => ({
        id: { type: GraphQLID },
        movieName: { type: GraphQLString },
        hero: { type: GraphQLString },
        director: { type: GraphQLString },
        song: {
            type: new GraphQLList(SongType),
            resolve(parent, args){
                // return _.filter(songs, {movieId:parent.id})
                return Song.find({movieId:parent.id})
            }
        }
    })
});

const SongType = new GraphQLObjectType({
    name: 'songs',
    fields: () => ({
        id: { type: GraphQLID },
        song: { type: GraphQLString },
        movie:{
            type:MovieType,
            resolve(parent, args){
                // return _.find(movies, {id:parent.movieId})
                return Movie.findById(parent.movieId)
            }
        }
    })
})

const rootQuery = new GraphQLObjectType({
    name: 'rootQueryType',
    fields: {
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return _.find(movies, { id: args.id })
                return Movie.findById(args.id)
            }
        },
        song: {
            type: SongType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // return _.find(songs, { id: args.id })
                return Song.findById(args.id)
            }
        },
        movies:{
            type:new GraphQLList(MovieType),
            resolve(parent, args){
                // return movies
                return Movie.find({});
            }
        },
        songs:{
            type:new GraphQLList(SongType),
            resolve(parent, args){
                // return songs
                return Song.find({});
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name:'mutations',
    fields: {
        addMovie:{
            type:MovieType,
            args: {
                movieName: { type: GraphQLString },
                hero: { type: GraphQLString },
                director: { type: GraphQLString },
            },
            resolve(parent, args){
                let movie = new Movie({
                    movieName:args.movieName,
                    hero:args.hero,
                    director:args.director,
                })
                return movie.save();
            }
        },
        addSong:{
            type:SongType,
            args:{
                song: { type: GraphQLString },
                movieId: { type: GraphQLID },
            },
            resolve(parent, args){
                let song = new Song({
                    song: args.song,
                    movieId: args.movieId,
                })
                return song.save();
            }
        }
    },
});

module.exports = new GraphQLSchema({
    query: rootQuery,
    mutation:Mutation,
});