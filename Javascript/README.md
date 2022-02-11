# Javascript
javascript assignment

In this que 3 and que 4 are same

## Assignment Questions

Que 1 - Create an Object Person with Object literals. The Object should have firstName, lastName and age properties

Que 2 - Create an Object MetadataParser using constructor functions 
        a) the Object should have private properties _version, _channel, _keyField 
        b) Object should have get and set function for each property
        c) Add a method in the class getKeyFields, which takes an array of JSON objects (eg [{channel: ‘A’}, {channel: ‘B’}, {channel ‘C’}]) as input and returns an            array of values of _keyField, input array.

Que 3 - Write a function groupObjectsBy which takes as an input an array of JSON objects and returns a grouped object by a key. Eg

Que 4 - 
 groupObjectsBy([ 
  {
    "channel": "A",
    "name": "shoe"
  },
  {
    "channel": "A",
    "name": "electronics"
  },
  {
    "channel": "B",
    "name": "apparel"
  },
  {
    "channel": "C",
    "name": "electronics"
  }
], ‘channel’)

Will return
{
  "A":[{"channel":"A","name":"shoe"},{"channel":"A","name":"electronics"}],
  "B":[{"channel":"B","name":"apparel"}],
  "C":[{"channel":"C","name":"electronics"}]
  
}

Que 5 - Implement inheritance. Define a constructor function SortArray which 
        a) Has a property originalArray
        b) Has get function to getSortedArray 
        c) Has a private function to sort the array.
        d) Takes as an input to construct an array of numbers
        e) Define another constructor function (SortObjectArray) which extends SortArray, and is used to sort array of JSON object

