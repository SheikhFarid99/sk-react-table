import React from 'react'
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import './style/tablePagination.css'

const TablePagination = (props) => {

    const {
        currentPage,
        parPage,
        totalItem,
        setCurrentPage,
        paginationItemShow,
        setColor,
        setSelected
    } = props

    let totalPage = Math.ceil(totalItem / parPage);

    let startLink = currentPage
    let diff = totalPage - currentPage

    if (diff <= (paginationItemShow || 4)) {
        startLink = parseInt(totalPage) - (paginationItemShow || 4);
    }
    let endLink = parseInt(startLink) + (paginationItemShow || 4);

    if (startLink <= 0) {
        startLink = 1;
    }
    const pageSelect = (page) => {
        setCurrentPage(page)
        setSelected([])
    }
    const createLink = () => {
        const storeLink = [];
        for (var i = startLink; i <= endLink; i++) {
            const a = i;
            storeLink.push(
                <li style={{ backgroundColor: parseInt(currentPage) === i ? `${setColor?.paginationActiveColor}` : `${setColor?.paginationItemColor}`, color: `${setColor?.textColor}` }} key={i} onClick={() => pageSelect(a)}>{i}</li>
            )
        }
        return storeLink
    }
    const nextPage = () => {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1)
            setSelected && setSelected([])
        }
    }
    const prePage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
            setSelected && setSelected([])
        }
    }
    return <div className='table-pagination'>
        <ul>
            <li style={{ backgroundColor: `${setColor?.paginationItemColor}`, color: `${setColor?.textColor}` }} onClick={prePage}><BsChevronDoubleLeft /></li>
            {createLink()}
            <li style={{ backgroundColor: `${setColor?.paginationItemColor}`, color: `${setColor?.textColor}` }} onClick={nextPage}><BsChevronDoubleRight /></li>
        </ul>
    </div>;
}

export default TablePagination;