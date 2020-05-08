# u235-varstar
## Variable Star Plotting Tool for Personal Research

This site was born of my desire to share my work with others. The old way of taking screenshots
and posting to forums just led to confusion especially in a dynamic environment where new observations
arrive whenever the weather improves.

Some clarification is needed of the term "Personal Research". The data you browse here is my own.
There is no facility to upload your own. This project is MIT licensed so you are free to clone it
and deploy your own instance if you wish. All code is freely available so you can extend it as you wish.
If anyone is interested in joining the effort to include support for user accounts, I would be happy
to be part of that project.

If you are interested in learning more about variable stars then I recommend visiting the website of the
[American Association of Variable Star Observers (AAVSO)](https://www.aavso.org/) or simply doing an
Internet search.

### Where can I find this website?
It is available [here](https://u235-varstar.now.sh/). The host is Vercel, formerly Zeit. It is a "hobby"
account so it is free with some limitations.

### I see but where do you keep the data?
Data is served from GitHub Pages which I configured to publish the contents of this repository's
"docs" folder. Currently there are three files:

1. [dir.json](https://oopfan.github.io/u235-varstar/dir.json)
1. [gk-boo.json](https://oopfan.github.io/u235-varstar/gk-boo.json)
1. [yz-boo.json](https://oopfan.github.io/u235-varstar/yz-boo.json)

*dir.json* stands for *Directory*. It contains the list of variable stars. Since the list will grow
over time as more stars are measured it is important to keep the overall size of the file as small as
possible. To achieve that requirement I only capture a handful of essential descriptive values for
each star.

*gk-boo.json* and *yz-boo.json* contain the actual observations. These files can become quite large
so that is why each star is assigned its own observations file.

### Why are these files served by GitHub Pages and not Vercel?
When I use the *now* command Vercel deploys and builds the entire web app on their servers. This is
overkill. The code hasn't changed, just the data. It is faster and more efficient to push changes to
the data files to GitHub and then have GitHub Pages automatically publish them.

### What language and framework are you using?
This is an Angular 9 project. It is very powerful but has a relatively steep learning curve. It is well
worth your time to learn it. There are several really great courses at Udemy. They frequently have sales
as low as $9.99. Normally courses cost $100 or more dollars, so wait for a sale.

### I'm not interested in programming but I like what you've done and would like deploy my own instance
Great! It is easy and free if you do it right. Both GitHub and Vercel have free accounts. If you need
some assistance you can contact me at kamisan at optimum dot net.
