import { Routes, Route } from 'react-router-dom';
import { PostPage } from '../pages/post/PostPage';
import { ChartPage } from '../pages/chart/ChartPage';

export const Router = () => {
  return (
    <Routes>
      <Route path="/post" element={<PostPage />} />
      <Route path="/chart" element={<ChartPage />} />
    </Routes>
  );
};

