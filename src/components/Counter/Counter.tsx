import { decrement, increment } from "@/redux/features/counter/counterSlice"
import { UseAppDispatch, useAppSelector } from "@/redux/hook"
import { Button } from "../ui/button"

const Counter = () => {
    const dispatch = UseAppDispatch()
    
      const {count} = useAppSelector((state)=>state.counter)

    const handleIncrement = () => {

    dispatch(increment())


  }

  const handleDecrement = () => {
    dispatch(decrement())
  }

    return (
        <div>
<h1>Counter With Redux</h1>

      
        <Button onClick={handleIncrement}>Increment</Button>

        <p>{count}</p>

        <Button className='bg-foreground' onClick={handleDecrement}>Decrement</Button>
        </div>
    )
}

export default Counter;