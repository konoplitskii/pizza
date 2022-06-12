import React, { useEffect, useRef, useState ,MouseEvent, FC, memo} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSort, Sort, sortPropertyEnum } from '../redux/slices/filterSlice';
import { RootState } from '../redux/store';

type sortTypeItem = {
  name:string,
  sortProperty:sortPropertyEnum
}

type SortPopupProps = {
  value:Sort;
}


export const sortList:sortTypeItem[] = [
  { name: 'популярности(DESC)', sortProperty: sortPropertyEnum.RATING_DESC },
  { name: 'популярности(ASK)', sortProperty: sortPropertyEnum.RATING_ASC},
  { name: 'цене(DESC)', sortProperty: sortPropertyEnum.PRICE_DESC},
  { name: 'цене(ASK)', sortProperty:  sortPropertyEnum.PRICE_ASC},
  { name: 'алфавиту(DESC)', sortProperty: sortPropertyEnum.TITLE_DESC},
  { name: 'алфавиту(ASK)', sortProperty: sortPropertyEnum.TITLE_ASC },
];

const SortPopup:FC<SortPopupProps> = ({value})=> {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  // const sort = useSelector((state:RootState) => state.filter.sort);

  const sortRef = useRef<HTMLDivElement | null>(null);

  const onSelectListItem = (obj:sortTypeItem) => {
    dispatch(setSort(obj));
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e:Event):void => {
      const _e = e as Event & {
        path:Node[]
      };
      if (sortRef.current && !_e.path.includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{value.name}</span>
      </div>
      {open ? (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, i) => {
              return (
                <li
                  key={i}
                  className={value.sortProperty === obj.sortProperty ? 'active' : ''}
                  onClick={() => onSelectListItem(obj)}>
                  {obj.name}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default memo(SortPopup);
