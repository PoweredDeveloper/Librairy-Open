import requests
from bs4 import BeautifulSoup

class Site:
    def __init__(self, name, url, selector, comment):
        self.name = name 
        self.url = url
        self.selector = selector
        self.comment = comment

class Crawler:
    def getBsObject(self, url):
        try:
            page = requests.get(url,)
            page.raise_for_status()
        except:
            return None
        return BeautifulSoup(page.text,'lxml')

    def getContent(self, page, selector):
        a = page.select(selector)
        if(a):
            return a
        return ""

    def parse(self, site):
        bsObj = self.sgetBsObject(site.url)
        info = self.getContent(bsObj, site.selector)
        if(info is not None):
            return info


url = "https://docs.python.org/3/library/index.html"

site = Site("python.org", 'https://docs.python.org/3/library/index.html', 'a.reference.internal', "sd")
crawler = Crawler()

links = crawler.parse(site)

print(links)
