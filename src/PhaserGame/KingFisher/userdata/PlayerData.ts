
export default class Player {
    public ID: string;
    public Name: string;
    public Balance: number;
  
    constructor(id: string = "guest-id", name: string = "Guest", balance: number = 0) {
      this.ID = id;
      this.Name = name;
      this.Balance = balance;
    }
  
    public addWin(amount: number): void {
      if (amount > 0) {
        this.Balance += amount;
        console.log(`${this.Name} won ${amount}. New balance: ${this.Balance}`);
      }
    }
  
    public addLoss(amount: number): void {
      if (amount > 0) {
        this.Balance -= amount;
        console.log(`${this.Name} lost ${amount}. New balance: ${this.Balance}`);
      }
    }
  
    public getBalance(): number {
      return parseFloat((this.Balance).toFixed(2));
    }
  }
  