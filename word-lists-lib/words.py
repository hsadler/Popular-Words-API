import json

words = {};
count = 0

with open('ten-thousand-words.txt', 'r') as words_file:
  for line in words_file:
    if len(line) > 2:
      count += 1
      words[count] = line[:-1]

with open('word-dict.json', 'w+') as words_dict:
  json.dump(words, words_dict)

