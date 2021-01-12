class StoreCustomer {
    public visits = 0
    private ourName: string

    constructor(private firstName: string, private lastName: string) {
    }

    public showName() {
        alert(`${this.firstName} ${this.lastName}`)
    }

    set name(value) {
        this.ourName
    }

    get name() {
        return this.ourName;
    }
}