export { };

declare global {
  type User = {
    id: number;
    name: string;
    email: string;
    entries: string;
    joined: string;
  };
  
  type BoundingBox = {
    top_row: number;
    bottom_row: number;
    left_col: number;
    right_col: number;
  };
  
  type DataRegions = {
    data: {};
    id: string;
    region_info: {
      bounding_box: BoundingBox;
    };
    value: number;
  }[];
  
  type DisplayInfo = {
    left: number;
    top: number;
    width: number;
    height: number;
  }[];

  type UserContextType = {
    currentUser: User;
    setCurrentUser: React.Dispatch<SetStateAction<User>>;
  };
  type LoadingContextType = {
    loading: boolean;
    setLoading: React.Dispatch<SetStateAction<boolean>>;
  };
}