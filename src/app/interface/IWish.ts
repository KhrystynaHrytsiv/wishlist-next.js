export interface IWish {
    id: string,
    title: string,
    description: string,
    image:string,
    price:number,
    link:string,
    status: 'free' | 'booked'
    createdAt: string
}