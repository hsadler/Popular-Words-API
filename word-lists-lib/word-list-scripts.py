import json

words = {};
count = 0

with open('ten-thousand-words1.txt', 'r') as words_file:
  for line in words_file:
    count += 1
    words[count] = line[:-1]

with open('word-dict1.json', 'w') as words_dict:
  json.dump(words, words_dict)


words = {};
count = 0

with open('ten-thousand-words2.txt', 'r') as words_file:
  for line in words_file:
    count += 1
    words[count] = line[:-1]

with open('word-dict2.json', 'w') as words_dict:
  json.dump(words, words_dict)
