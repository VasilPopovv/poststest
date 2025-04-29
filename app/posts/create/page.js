'use client'
import { useDispatch } from "react-redux"
import { useLayoutEffect } from "react"
import { changeTitle } from "@/lib/features/TitleSlice"

const page = () => {
    const dispatch = useDispatch()

    useLayoutEffect(() => {
        dispatch(changeTitle('Створити пост'))
    }, [dispatch])


    return (
        <div>page</div>
    )
}

export default page