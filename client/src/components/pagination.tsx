const Pagination = ({ pagination, onPageChange }:{pagination:{page:number,totalPages:number,total:number},onPageChange:(page:number)=>void}) => {
    const totalPages = Math.ceil(pagination.total / 10);
    const currentPage = pagination.page;
    const goToPage = (page: number) => {
      onPageChange(page);
    };

  return (
    <div className="flex justify-center w-full items-center p-4 gap-3">
      <button
        className="p-2 border rounded-md mr-2"
        // onClick={() => goToPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {[...Array(Math.min(5, totalPages))].map(
        (_, index) => (
          <button
            key={index}
            className={` py-1 border rounded-md px-10  min-w-[30px] ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`}
            onClick={() => goToPage(index + 1)}
          >
            {index + 1}
          </button>
        )
      )}

      {totalPages > 5 && (
        <span className="mx-1">...</span>
      )}

      <button
        className="p-2 border rounded-md ml-2"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
