import { useEffect, useState } from "react";
import axios from "axios"

function FoodsAPI() {
  const [foods, setfoods] = useState([]);
  const [callback, setcallback] = useState(false);
  const [categories, setcategories] = useState("");
  const [sort, setsort] = useState("");
  const [search, setsearch] = useState("");
  const [page, setpage] = useState(1);
  const [result, setresult] = useState(0);

  useEffect(() => {
    const getfoods = async () => {
      const res = await axios.get(
        `/api/foods?limit=${
          page * 9
        }&${categories}&${sort}&title[regex]=${search}`
      );
      setfoods(res.data.foods);
      setresult(res.data.result);
      console.log(res);
    };
    getfoods();
  }, [callback, sort, search, page, categories]);
  return {
    foods: [foods, setfoods],
    callback: [callback, setcallback],
    categories: [categories, setcategories],
    sort: [sort, setsort],
    result: [result, setresult],
    page: [page, setpage],
    search: [search, setsearch],
  };
}

export default FoodsAPI;
