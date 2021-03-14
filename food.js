class Food{
    constructor(){
        this.stock=0;
        this.lastFed=0;
        this.image=loadImage('img/milk.png');
    }


display(){
    background(46,139,87);

    fill(255,255,254);
    textSize(15);
    
    if(lastFed>=12){
        text("Last Feed : "+ lastFed % 12 + " PM", 50,30);
    }else if(lastFed==0){
        text("Last Feed : 12 AM",50,30);
    }else{
        text("Last Feed : "+ lastFed + " AM", 50,30);
    }
    
    var x=70,y=100; 
    imageMode(CENTER);
    if(this.stock!=0){
    for(var i=0;i<this.stock;i++){
      if(i%10==0){
        x=70;
        y=y+50;
      }
      image(this.image,x,y,50,50);
      x=x+30;
    }
  }
}
bedroom(){
    background(bedroom,550,500);  
}
  
garden(){
    background(garden,550,500);  
} 

washroom(){
    background(washroom,550,500); 
}
}