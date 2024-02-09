import Card from "../card";
import TextInput from "../form/textInput";
import SearchIcon from "../../assets/icons/searchIcon";
import { useEffect, useState } from "react";
import { getUserByName } from "../../service/apiClient";
import UserCard from "../userCard";

const UserSearchBar = () => {
  const [searchVal, setSearchVal] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const onChange = (e) => {
    setSearchVal(e.target.value);
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await getUserByName(searchVal);
        setSearchResults(res);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    getUsers();
  }, [searchVal]);

  return (
    <>
      <Card>
        <form>
          <TextInput
            icon={<SearchIcon />}
            value={searchVal}
            name="Search"
            onChange={onChange}
          />
        </form>
      </Card>
      {searchVal && (
        <Card>
          <ul>
            {searchResults.map((user, index) => {
              return <UserCard key={`usercardKey${index}`} user={user} />;
            })}
          </ul>
        </Card>
      )}
    </>
  );
};

export default UserSearchBar;
