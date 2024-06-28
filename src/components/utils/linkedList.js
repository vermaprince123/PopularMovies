class ListNode {
    constructor(pageNumber) {
      this.pageNumber = pageNumber;
      this.next = null;
      this.prev = null;
    }
};

export default class LinkedList{

    head = null;

    constructor(pageNumber=1){
        this.head = new ListNode(pageNumber);
    }

    goToNext(){
        let temp = new ListNode(this.head.pageNumber+1);
        this.head.next = temp;
        temp.prev = this.head;
        this.head = temp;
    }

    goToPrev(){
        this.head = this.head.prev;
    }

    isEmpty(){
        return (this.head.prev==null);
    }

    getCurrentPage(){
        return this.head.pageNumber;
    }
}