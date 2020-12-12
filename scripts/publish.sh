#!/bin/bash

gulp build && bundle exec jekyll build -s ./generator -d ./dist --incremental && netlify deploy --dir=./dist --prod