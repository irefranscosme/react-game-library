import React, { useEffect, useState } from "react";
import Search from "./Search";
import Sort from "./Sort";
import SortDropDown from "./SortDropDown";
import Games from "../../types/Games";

interface Props {
  category?: string;
}

const ALPHABETICAL = 1;
const RELEASE_DATE = 2;
const POPULARITY = 3;
const RELEVANCE = 4;

const Content = ({ category }: Props) => {
  const [games, setGames] = useState<Array<Games>>([]);
  const [searchedGames, setSearchedGame] = useState("");
  const [dropDownSort, setDropDownSort] = useState(false);
  const [sort, setSort] = useState(0);

  const fetchGames = async () => {
    try {
      const url =
        "https://free-to-play-games-database.p.rapidapi.com/api/games";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "e99ab8614dmsh9fa4bdc448a9a1bp1352d2jsnaa3c19a0e7d4",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
      };

      const response = await fetch(url, options);
      const result: Array<Games> = await response.json();

      const search = Array.from(result).filter((game: Games) => {
        const newTitle = game.title.toLowerCase().split(" ").join(" ");

        if (newTitle.includes(searchedGames)) {
          return game;
        }
      });

      if (search) {
        setGames(search);
      } else {
        setGames(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sortGameByWithCategory = async (value: string) => {
    try {
      const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}&sort-by=${value}`;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "e99ab8614dmsh9fa4bdc448a9a1bp1352d2jsnaa3c19a0e7d4",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
      };

      const response = await fetch(url, options);
      const result: Array<Games> = await response.json();

      const search = Array.from(result).filter((game: Games) => {
        if (game.title.includes(searchedGames)) {
          return game;
        }
      });

      if (search) {
        setGames(search);
      } else {
        setGames(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sortGameByWithoutCategory = async (value: string) => {
    try {
      const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=${value}`;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "e99ab8614dmsh9fa4bdc448a9a1bp1352d2jsnaa3c19a0e7d4",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
      };

      const response = await fetch(url, options);
      const result: Array<Games> = await response.json();

      const search = Array.from(result).filter((game: Games) => {
        if (game.title.includes(searchedGames)) {
          return game;
        }
      });

      if (search) {
        setGames(search);
      } else {
        setGames(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const filterGames = async () => {
    try {
      const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "e99ab8614dmsh9fa4bdc448a9a1bp1352d2jsnaa3c19a0e7d4",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
      };

      const response = await fetch(url, options);
      const result: Array<Games> = await response.json();

      const search = Array.from(result).filter((game: Games) => {
        if (game.title.includes(searchedGames)) {
          return game;
        }
      });

      if (search) {
        setGames(search);
      } else {
        setGames(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (category == "All") {
      // filterGames();
      fetchGames();

      if (sort == ALPHABETICAL) {
        sortGameByWithoutCategory("alphabetical");
      }

      if (sort == RELEASE_DATE) {
        sortGameByWithoutCategory("release-date");
      }

      if (sort == POPULARITY) {
        sortGameByWithoutCategory("popularity");
      }

      if (sort == RELEVANCE) {
        sortGameByWithoutCategory("relevance");
      }
    } else {
      filterGames();

      if (sort == ALPHABETICAL) {
        sortGameByWithCategory("alphabetical");
      }

      if (sort == RELEASE_DATE) {
        sortGameByWithCategory("release-date");
      }

      if (sort == POPULARITY) {
        sortGameByWithCategory("popularity");
      }

      if (sort == RELEVANCE) {
        sortGameByWithCategory("relevance");
      }
    }
  }, [category, searchedGames, sort]);

  const displayGames = () => {
    return games.map((game: Games, gameIndex: number) => {
      return (
        <li
          key={gameIndex}
          className="border-slate-900 border-2 rounded-lg text-slate-900 w-[15em] px-2 py-3"
        >
          <div>
            <h3 className="font-bold">{game.title}</h3>
            <p>{game.publisher}</p>
          </div>
          <img
            className="w-full max-w-[15rem] rounded-lg mt-3"
            src={game.thumbnail}
            alt="image"
          />
          <div className="mt-5 flex flex-col">
            <div className="flex gap-1">
              <h6 className="text-sm">Category:</h6>
              <p className="text-sm font-bold">{game.genre}</p>
            </div>
            <div className="flex gap-1">
              <h6 className="text-sm">Platform:</h6>
              <p className="text-sm font-bold">{game.platform}</p>
            </div>
            <div className="flex gap-1">
              <h6 className="text-sm">Release Date:</h6>
              <p className="text-sm font-bold">{game.release_date}</p>
            </div>
          </div>
        </li>
      );
    });
  };

  const searchGame = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedGame(event.target.value.toLowerCase());
  };

  const sortGame = (value: number) => {
    console.log(value);
    setSort(value);
  };

  return (
    <main className="p-2 basis-10/12">
      <div className="flex justify-between relative">
        <Search onSearch={searchGame}></Search>
        <Sort
          sort={dropDownSort}
          onClick={
            !dropDownSort
              ? () => setDropDownSort(true)
              : () => setDropDownSort(false)
          }
        ></Sort>
        {dropDownSort && <SortDropDown onClick={sortGame} />}
      </div>
      <ul className="flex flex-wrap gap-2 mt-2">{displayGames()}</ul>
    </main>
  );
};
export default Content;