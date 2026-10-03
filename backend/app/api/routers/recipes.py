from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session, joinedload
from typing import List, Optional

from app.db.session import get_db
from app.models.models import Recipe
from app.schemas.schemas import RecipeOut

router = APIRouter(prefix="/recipes", tags=["Recipes"])

@router.get("", response_model=List[RecipeOut])
def get_recipes(
    category: Optional[str] = None,
    is_featured: Optional[bool] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Recipe).options(joinedload(Recipe.product)).filter(Recipe.is_active == True)
    
    if category:
        query = query.filter(Recipe.category == category)
    if is_featured is not None:
        query = query.filter(Recipe.is_featured == is_featured)
    if search:
        query = query.filter(
            (Recipe.title.ilike(f"%{search}%")) |
            (Recipe.hindi_title.ilike(f"%{search}%")) |
            (Recipe.description.ilike(f"%{search}%"))
        )
    return query.order_by(Recipe.order_index.asc(), Recipe.id.asc()).all()

@router.get("/slug/{slug}", response_model=RecipeOut)
def get_recipe_by_slug(slug: str, db: Session = Depends(get_db)):
    recipe = db.query(Recipe).options(joinedload(Recipe.product)).filter(
        Recipe.slug == slug, Recipe.is_active == True
    ).first()
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return recipe

@router.get("/{recipe_id}", response_model=RecipeOut)
def get_recipe_by_id(recipe_id: int, db: Session = Depends(get_db)):
    recipe = db.query(Recipe).options(joinedload(Recipe.product)).filter(
        Recipe.id == recipe_id
    ).first()
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return recipe
