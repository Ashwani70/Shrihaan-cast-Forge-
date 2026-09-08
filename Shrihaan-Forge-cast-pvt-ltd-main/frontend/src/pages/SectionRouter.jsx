import React from 'react';
import { useParams } from 'react-router-dom';
import { getDivision, getCategory } from '../data/products';
import DivisionPage from './DivisionPage';
import CategoryPage from './CategoryPage';

// /products/:section resolves to a division page first, then a scaffolding category page.
export default function SectionRouter(props) {
  const { section } = useParams();
  if (getDivision(section)) return <DivisionPage {...props} />;
  return <CategoryPage {...props} />;
}
