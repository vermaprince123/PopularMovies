class ListNode {
    constructor(data) {
      this.data = data;
      this.next = null;
      this.prev = null;
    }
};

export default class LinkedList{

    head = null;
    size = 0;
    capacity = 0;

    constructor(data,capacity){
        this.head = new ListNode(data);
        this.capacity = capacity;
        this.size = 1;
    }

    isFull(){
        return (this.size === this.capacity);
    }

    goToNext(){
        if(this.isFull()){
            return null;
        }
        let temp = new ListNode(this.head.data+1);
        this.head.next = temp;
        temp.prev = this.head;
        this.head = temp;
        this.size++;
        return this.head;
    }

    goToPrev(){
        if(this.isEmpty()){
            return null;
        }
        this.head = this.head.prev;
        this.size--;
        return this.head;
    }

    isEmpty(){
        return this.size===0;
    }

    isOnFirst(){
        return (this.size===1);
    }

    isOnLast(){
        return (this.size===this.capacity);
    }
}