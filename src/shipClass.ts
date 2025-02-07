class ship{
    length: number;
    hp: number;
    construcotr(length: number){
        this.length = length;
        this.hp = length;
    }

    hit(){
        if (!this.isSunk()){
            this.hp--;
        }
    }
    
    isSunk(){
        if (this.hp < 1) {return true}
        else {return false};
    }
}
