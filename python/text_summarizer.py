# ========== L I B R A I R Y ==========
# Script written by Istomin Mikhail
# PoweredDeveloper <https://github.com/PoweredDeveloper>

import nltk
import heapq
from nltk import re


article = 'В России четыре времени года: весна, лето, осень и зима. Весной на смену суровым зимним морозам приходит тепло и природа оживает. В середине марта начинает таять снег и распускаются первые цветы. На деревьях появляются листья. Дни становятся длиннее. Лето в России довольно короткое, но теплое, а иногда жаркое. Длинные летние дни –излюбленное время для всех птиц и животных. Летом мы любим плавать, загорать и ездить на природу или на море. За летом приходит осень – самый дождливый сезон. Это очень красивое время года, когда листья меняют цвет и вспыхивают разными красками: желтым, оранжевым, красным. С первыми заморозками они начинают опадать. Погода становится пасмурной, а дни – мрачными. Морозная снежная зима – символ России. Она начинается в конце ноября и длится до середины марта. Реки покрываются льдом. Дни становятся короче. Рано темнеет. Январь – самый холодный месяц, именно после Нового Года случаются знаменитые русские морозы с температурой ниже 30 градусов.'
doneTextSize = 10
language = 'russian'

article_formated = re.sub('[^A-zЁёА-я]', ' ', article)
article_formated = re.sub(r'\s+', ' ', article_formated)
sentence_list = nltk.sent_tokenize(article)
stopwords = nltk.corpus.stopwords.words(language)
word_frequencies = {}
for word in nltk.word_tokenize(article_formated):
    if word not in stopwords:
        if word not in word_frequencies.keys():
            word_frequencies[word] = 1
        else:
            word_frequencies[word] += 1
maximum_frequncy = max(word_frequencies.values())

for word in word_frequencies.keys():
    word_frequencies[word] = (word_frequencies[word]/maximum_frequncy)
sentence_scores = {}

for sent in sentence_list:
    for word in nltk.word_tokenize(sent.lower()):
        if word in word_frequencies.keys():
            if len(sent.split(' ')) < 30:
                if sent not in sentence_scores.keys():
                    sentence_scores[sent] = word_frequencies[word]
                else:
                    sentence_scores[sent] += word_frequencies[word]

summary_sentences = heapq.nlargest(doneTextSize, sentence_scores, key=sentence_scores.get)
summary = ' '.join(summary_sentences)

print(summary)