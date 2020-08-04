---
layout: post
title: "Cached Semantic Maps: An Introduction"
date: 2020-05-02
description: 
image: /assets/posts/cached-semantic-maps.jpg
author: Vaishnav
tags:
  - Builds
topics:
  - C++
  - Data Structures
  - Caching
---

Right, I know what you're thinking. _Cached Semantic Maps? Pfft, sounds pretentious_. And you know what? I agree. I don't think this is a data structure that has many practical benefits. But I think it's a cool idea, and no amount of _practicality_ is going to stand in my way when it comes to cool ideas.
### Some Background
I made this idea up when I was attending a training session at my Morgan Stanley internship during the summers of 2019. It was a brief intro into how programming was _really_ used in industry, where they asked us questions of increasing difficulty, and we were to propose interesting solutions. Finally, they formed us into groups of four and pitched this question---
#### Make a data structure that can store and query the data from a cricket tournament.
The first idea that everyone would think of, of course, is to store the data in a class or hashmap or something similar. For example, we thought of representing each match as a class and store the matches in an array. We found out very quickly that this is a bad idea---for every type of query except of the form "What is this stat of this match," you'd have to either go through all the data points within a particular match, or (worse) data points within each of the matches.

We started thinking of ways to fix this. We thought of a couple of approaches:

 1. Store every stat (say runs till now, average speed, etc) in a hashmap. This would give us O(1) queries and possibly O(1) updates. However, this left our model completely inflexible. If anyone wanted to query something we hadn't designed, it was pretty much impossible.
 2. Segregate the data into two kinds---culumative and individual. Store all the individual data points in a balanced tree, and store all the cumulative points in a hashmap. This way, we can easily do queries like a maximum, minimum, etc in O(log(n)) time, and get cumulative data points in O(1) time. For crazy queries, we could simply do it in a brute force manner, although this would be costly.

To be fair, this second solution was _good enough_, even for us at the time. However, we found that many other teams also got to this conclusion. We were students at our first internship. We wanted to stand out and be good bois and gals. So, half out of panic and half of ambition, we proposed

### The Cached Semantic Map
We noticed something very peculiar about this kind of system. Most of the times, when a match is ongoing, there's a very limited number of things someone would want to query. Maybe something about the previous average stats of the players, maybe something about the current status of the game, etc. More complex queries are much more common in between games, where updates are rare. This lead us to our Aha! moment---we can have complex queries take any amount of time because we can cache the results! We couldn't cache in the previous scenario because updates (which are very frequent during a game) would invalidate the cache. But this changed the way we approached the problem.
Now, we had to build a data structure which:
  1.  Is able to update relatively quickly, while at the same time being able to query a limited set of pre-decided queries quickly, and
  2.  Is able to handle complex queries (the more expressive the better), and
  3.  Is able to cache results for the complex queries.

We proposed a system which would store the basic components of the game (details of balls, players, etc) as a **semantic map**, which is basically a graph where each node was of a certain type (say "team" or "ball"), and each edge contained information which was relevant to the objects connected. We then explained the need for and the viability of a cache, and the system of balanced trees we could use to store more common answers for when the game was ongoing. With that, we were done.

### Actually Building It

I started thinking about this recently because I started doing some competitive coding. I suddenly realized that this is actually quite a challenging data structure to implement, and what seemed like a simple solution at the time would probably be *really* challenging to build in reality.

...so I decided that it'd be fun to try and make it.

# Thinking about the queries

When I started thinking about it, I couldn't really pin down _what_ I'd have to do to do various things. I thought that this is probably because the system wasn't really explained thoroughly, and I decided that a good place to start would be to understand the queries that we'd support. And what better way to do this than to lay out the rules for the querying language?

The steps now were simple. Think about the types of queries you'd need, categorize them and try to find similarities, and then specify how the program would expect these groupings.

### What kind of queries are there?

