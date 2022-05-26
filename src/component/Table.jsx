import React, { useRef, useEffect, useState } from 'react';
import TablePagination from './TablePagination';
import { FaTrash } from "react-icons/fa";
import './style/table.css'

const Table = (props) => {

    let {
        data,
        columns,
        rowNumber,
        selector,
        setrowParPage,
        setCurrentPage,
        totalItem,
        parPage,
        currentPage,
        useFunction,
        setSearchValue,
        filterKey,
        filterValue,
        setFilterValue,
        deleteData,
        selected,
        setSelected,
        selectRef,
        paginationItemShow,
        setColor
    } = props

    const allHandle = (e) => {
        if (e.target.checked) {
            setSelected(data.map(d => ({ selectKey: d[selectRef].toString() })))

        } else {
            setSelected([])
        }
    }

    const singlehandle = ({ target }) => {
        const value = target.value;
        if (target.checked) {
            setSelected([...selected, { selectKey: value }])
        } else {

            let back = [];
            for (var i = 0; i < selected.length; i++) {
                if (value !== selected[i].selectKey) {
                    back.push(selected[i]);
                }
            }
            setSelected(back);
        }
    }
    const rowHendle = (row) => {
        setrowParPage && setrowParPage(parseInt(row))
        setCurrentPage && setCurrentPage(1)
    }

    const bodyRef = useRef();
    const tableRef = useRef();

    const [screenSize, getDimension] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    const responsiveTable = () => {
        if (bodyRef.current && tableRef.current) {
            if (tableRef.current.offsetWidth > bodyRef.current.offsetWidth) {
                bodyRef.current.style.overflowX = 'scroll'
            } else {
                bodyRef.current.style.overflowX = ''
            }
        }
    }
    useEffect(() => {
        responsiveTable();
    }, [screenSize, data])

    const setDimension = () => {
        getDimension({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }

    useEffect(() => {
        window.addEventListener('resize', setDimension);
        return (() => {
            window.removeEventListener('resize', setDimension);
        })
    }, [screenSize])

    return (
        <div style={{ backgroundColor: `${setColor?.backgroundColor}`, color: `${setColor?.textColor}` }} className='react-table-sf'>
            {
                (setrowParPage || parPage || setSearchValue || setFilterValue !== 'undefined' || filterValue) &&
                <div className="react-table-sf-header">
                    <div className="rowShow">
                        {
                            setrowParPage && parPage && <>
                                <span>Show</span>
                                <select style={{ backgroundColor: `${setColor?.backgroundColor}`, color: `${setColor?.textColor}` }} onChange={(e) => rowHendle(e.target.value)} className='rowSelect'>
                                    {
                                        parPage && <option value={parPage}>{parPage}</option>
                                    }
                                    {
                                        rowNumber.length > 0 ? rowNumber.map(r => r !== parPage && <option key={Math.random()} value={r}>{r}</option>) : <option value={5}>5</option>
                                    }

                                </select>
                                <span>Row</span>
                            </>
                        }
                        {
                            deleteData && <div onClick={() => deleteData(selected)} className='deleteIcon'><FaTrash /></div>
                        }
                    </div>
                    {
                        setSearchValue && <div className="search">
                            <div>
                                <input style={{ backgroundColor: `${setColor?.backgroundColor}`, color: `${setColor?.textColor}`, border: `1px solid ${setColor?.borderColor}` }} onChange={(e) => setSearchValue(e.target.value)} className='data-search' placeholder='Search' type="text" />
                            </div>
                        </div>
                    }
                    {
                        setFilterValue && filterValue !== undefined &&
                        <div className="filter">
                            <select style={{ backgroundColor: `${setColor?.backgroundColor}`, color: `${setColor?.textColor}`, border: `1px solid ${setColor?.borderColor}` }} onChange={(e) => setFilterValue(e.target.value)} className="rowSelect mx-0">
                                {
                                    filterValue && <option value={filterValue}>{filterValue}</option>
                                }
                                {
                                    filterKey.length > 0 && filterKey.map(fv => fv ? fv !== filterValue ? <option key={Math.random()} value={fv}>{fv}</option> : '' : <option key={Math.random()} value={fv}>select</option>)
                                }
                            </select>
                        </div>
                    }
                </div>
            }
            <div ref={bodyRef} style={{ textAlign: 'center' }} className="table_body">
                <table ref={tableRef}>
                    {
                        data.length > 0 ? <>
                            <thead>
                                <tr style={{ borderBottom: `1px solid ${setColor?.borderColor}` }}>
                                    {
                                        selector && <td><input onChange={allHandle} checked={data.length === selected.length} className='check_box' type="checkbox" /></td>
                                    }
                                    {
                                        columns.length > 0 && columns.map(hed =>
                                            <th key={Math.random()}>{hed.name}</th>
                                        )
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((da, i) =>
                                        <tr style={{ borderBottom: `1px solid ${setColor?.borderColor}` }} key={i}>
                                            {
                                                selector && <td><input value={da[selectRef]} onChange={singlehandle} checked={selected.length ? selected.some(f => f.selectKey === da[selectRef].toString()) : false} className='check_box' type="checkbox" /></td>
                                            }
                                            {
                                                columns.length > 0 && columns.map((hed) =>
                                                    <td key={Math.random()} >{hed.cell(da, useFunction && useFunction)}</td>
                                                )
                                            }
                                        </tr>
                                    )
                                }
                            </tbody></>
                            : <tbody>
                                <tr style={{ border: 'none' }}>
                                    <td style={{ textAlign: 'center' }}>Data not found</td>
                                </tr>
                            </tbody>
                    }
                </table>
            </div>
            {
                (currentPage && parPage && totalItem && parPage < totalItem) ?
                    <div className="table_footer">
                        <div>
                            <TablePagination
                                setSelected={setSelected}
                                currentPage={currentPage}
                                parPage={parPage}
                                totalItem={totalItem}
                                setCurrentPage={setCurrentPage}
                                paginationItemShow={paginationItemShow}
                                setColor={setColor ? setColor : ''}
                            />
                        </div>
                    </div> : ''
            }
        </div>
    )
}
export default Table

