import React from "react";

function Search({ searchValue, search, handleSearchChange }) {
	return (
		<div className="w-full p-2 md:p-3 flex justify-center sticky top-0 items-center">
			<div className="md:w-1/2 w-[95%] relative">
				<input
					placeholder="Search here..."
					name="search"
					className="rounded w-full pr-12 shadow-black shadow-2xl border-2 z-10 border-slate-300"
					type="search"
					value={searchValue}
					onChange={handleSearchChange}
				/>

				<button
					className="absolute hover:bg-slate-900 duration-200 hover:text-gray-400 right-0 h-full text-gray-700 bg-slate-300 px-4 rounded felx justify-center items-center"
					type="button"
					onClick={search}
				>
					<i className="fa-solid fa-magnifying-glass"></i>
				</button>
			</div>
		</div>
	);
}

export default Search;
