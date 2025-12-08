import { Routes, Route, Navigate } from 'react-router-dom';
import { PostPage } from '../pages/post/PostPage';
import { ChartPage } from '../pages/chart/ChartPage';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/post" replace />} />
      <Route path="/post" element={<PostPage />} />
      <Route path="/chart" element={<ChartPage />} />
    </Routes>
  );
};

