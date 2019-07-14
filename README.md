# MochileApp-Flask

The goal of this app is to make it easy for a hypothetical tourism company to provide their services to schools, since it is a
common practice here in Chile to travel with your classmates in your final year of school it makes a lot of sense.

## Tools I'm using:
* **SQL** - with a relational database (**MySQL**), for data storage.
* **Python** - with **Flask** web framework, for tasks like routing, template rendering and more.
* **JavaScript** - for front-end logic such as form validation, AJAX calls to the server and some UI animations (using **jQuery**)
* **HTML/CSS** - (very bad CSS) for core front-end. 

---
## DEMO

### Parent's View of The Application
Parents get access to their child payment status by entering their kid's "RUT" (a unique national number that everybody has)
here they can check the contract and see what is included in the travel, and they are able to deposit the money to pay for the services.

![Parent's View](https://i.imgur.com/F7qxKLM.gif "Parent's View")

### Salesman's View of the Application
Salesman get access to their management board where they can add new "classroom" (associated with the classroom of kids that are going to travel) and then they can register students to those classrooms, when they are succesfully registered parents can access their payment status on the parent's view.

![Salesman's View](https://i.imgur.com/Be5Di0X.gif "Salesman's View")

---

### References:
I'm using a very beautiful animation in my home template which was made with TweenMax.js animation library and I got it from here:
https://codepen.io/issey/pen/wzQJZE

Most of the icons and images I used I got them from here:
https://icon-icons.com/

---

### Considerations:
*  I learnt Python while a was learning to use the Flask framework and by reading the book [Learn Python 3 The Hard Way](https://www.amazon.com/Learn-Python-Hard-Way-Introduction/dp/0134692888) by Zed Shaw (which helped me the most), and I found it to be a very nice language to work with, pretty simple and clean, I already had a Java Programming course last semester so I was already familiar with programming fundamentals and it was relatively easy to catch up, especially because the syntax is very clean and beginner friendly.

*  I already learnt some JavaScript through a Udemy course last summer so that was very helpful as it was a very important tool while developing the app, I was thinking that it would be a good idea using everything I learnt and build everything in vanilla JavaScript, but as I had limited time due to the assignment deadline I chose to use some jQuery as it is very easy to use and helped me a lot in regards to animations, but I still did most of my logic and AJAX calls in pure ES6 JavaScript.

*  And finally my CSS code is really a shame, I haven't really studied CSS that much so there are serious bad practices going on there (I mean it, I used mainly id selectors), all templates are not responsive but I still managed to put them 
together regardless of my lack of CSS proficiency and learnt a lot throughout the development of the interfaces, I already got  a course to tackle CSS properly.

    (Most of my comments and logic are in spanish so my classmates understand what is going on with my code)
