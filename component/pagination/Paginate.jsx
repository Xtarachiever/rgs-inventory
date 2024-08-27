import ReactPaginate from "react-paginate";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import styles from "./styles.module.css";

const Paginate = ({ items, eachItemPerPage, setItemOffset, totalItems }) => {
  const itemsPerPage = eachItemPerPage ? eachItemPerPage : 10;


  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
    <div className="flex justify-between items-center my-4 float-right pt-2">
        <ReactPaginate
            breakLabel="..."
            nextLabel={<FaChevronRight className="inline mb-1" />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel={<FaChevronLeft className="inline mb-1" />}
            renderOnZeroPageCount={null}
            nextClassName={styles.nextClassName}
            previousClassName={styles.previousClassName}
            containerClassName={styles.containerClassName}
            pageLinkClassName={styles.pageLinkClassName}
            activeClassName={styles.activeClassName}
            disabledLinkClassName={styles.disabledClassName}
        />
    </div>
    </>
  );
};

export default Paginate;
