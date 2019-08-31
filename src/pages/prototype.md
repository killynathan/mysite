---
title: "Prototypal Inheritance in Javascript"
date: "2019-07-14"
visible: "false"
---

Prototype in JavaScript was something I really strugged to wrap my head around so I hope and can clear this concept up for some people.

You often hear that JavaScript is a **prototype-based** language. If you are like me, you simple put it off for as long as possible or refused to acknowledge its existence, but fear not, it's not as scary as it sounds!

Simply put, objects can have a **prototype** object in which it inherits from. (((A series of objects inheriting from is called a **prototype chain**.))) Let's see this in action.

```javascript
class Dog {
  bark() {
    console.log("woof woof")
  }
}

class GoldenRetriever extends Dog {
  retrieve() {
    console.log("retrieve success!")
  }
}

const myDog = new GoldenRetriever()
myDog.bark() // what is happening here?
```

This looks like standard behavior for object oriented languages, so what is different about inheritence in JavaScript? To find out, let dive into how inheritance is handled.

1. First, Javascript looks for the `bark` method from the `myDog` object. It doesnt find it there.
2. It looks for `bark` from `GoldenRetriever.prototype`. It doesn't find it there.
3. Lastly, it looks at where `GoldenRetriever` inherited from, which is `Dog.prototype`, where it does find the `bark` method.

As you can see, JavaScript uses `prototype` to find out what inherited properties and methods an object gets from it's parent. From the MDN documentation:

> The prototype property's value is an object, which is basically a bucket for storing properties and methods that we want to be inherited by objects further down the prototype chain.

One important thing to note is that "The prototype property's value is an object". You heard that right. Its just an object! That is why you are able to things like:

```javascript
Dog.prototype.family = "Canidae"

myDog.family // Same myDog as above. Will output Canidae.

const yourDog = new Dog() // created directly from Dog
yourDog.family // Will also output Canidae
```

You saw that right! Since `prototype` is just an object, you can assign things to it that you want all instances of an class to have or children of that class to have! You have probably even done this a couple times already without understanding why it works.

So what in the world is happening? Let's begin by defining `prototype`.

`prototype` is where the inherited properties and methods are defined. When you say `yourDog.family`. JavaScript will look at `Dog`'s `prototype` for the `family` property. In this case it finds it. In the case it doesn't find it, like with `myDog`, it will look at its parent, `Dog`'s, `prototype`. If it doesn't find `name` there, it will look at `Dog`'s parent's `prototype` and so on. This process of looking at `prototype` for a property of an object and moving up to the parent's `prototype` and so on is known as the **protototype chain**.

One important thing to note is that you can only call `prototype` on objects you created with the `new` keyword. This is because `prototype` is meant to allow you to apply changes to many things at once, which is what classes and creating instances of thoses classes with `new` is all about.

Now lets see some examples of things not working.

```javascript
GoldenRetriever.size = "Big"
myDog.size // undefined
```

Why doesn't the above work? Because we aren't assigning to `prototype`! Again, `prototype` is where the inherited properties and methods are defined.

```javascript
var Person = {
  name: "Joe",
}
Person.prototype.age = 33 // error
```

If you print out `Dog.prototype` you will that see `prototype` is an object. From the MDN documentation:

> The prototype property's value is an object, which is basically a bucket for storing properties and methods that we want to be inherited by objects further down the prototype chain.

---

## Alright, so what in the world is `__proto__` then?

Now you may be asking, "so how do I know what an object's parent is". This is where the `__proto__` keyword comes in. Building off our previous example, try executing this line of code:

```javascript
GoldenRetriever.__proto__
```

As you can see, `__proto__` tells you what something is inherting from. You probably aren't suprised to see `Dog`. What is confusing however is that `prototype` is what you probably expected `__proto__` to be. After all, it is called the **prototype chain**! What is worse is that `__proto__` was never supposed to even exists. Matter of fact, it is deprecated and you probably shouldn't be using it. It is however useful for showing how the **prototype-chain** works. Try executing this code:

```javascript
;(1).__proto__(
  // Number
  1
).__proto__.__proto // Object
```

You might of also heard people say "everything in JavaScript is an Object, and this is what they mean. Nearly everything in javascript inherits from `Object` at the very top. That is why you can call methods like `toString` or `isPrototypeOf` on almost anything, because these methods are defined in `Object`.

And that wraps it up! I hope I was able to clear this up for you all. If you want more information about anything Javascript, please check out the MDN web docs from Mozilla. It is a great read and source of information.
