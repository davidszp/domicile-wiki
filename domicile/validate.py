"""Validate researched data files: ``python -m domicile.validate [paths...]``.

With no arguments every file under data/jurisdictions, data/subnational, data/income, data/income_regions,
data/immigration, data/succession and data/recipes is checked.
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

from pydantic import ValidationError

from domicile.schema import ImmigrationFile, IncomeFile, Jurisdiction, Subnational, RegionalIncomeFile, SuccessionFile, RecipeFile

ROOT = Path(__file__).resolve().parent.parent


def validate_file(path: Path) -> list[str]:
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as e:
        return [f"{path}: invalid JSON: {e}"]
    model = {"subnational": Subnational, "income": IncomeFile, "income_regions": RegionalIncomeFile, "immigration": ImmigrationFile, "succession": SuccessionFile, "recipes": RecipeFile}.get(path.parent.name, Jurisdiction)
    try:
        obj = model.model_validate(data)
    except ValidationError as e:
        return [f"{path}: {err['loc']}: {err['msg']}" for err in e.errors()]
    errors = []
    if model is Jurisdiction and obj.id != path.stem:
        errors.append(f"{path}: id {obj.id} does not match file name")
    if model in (IncomeFile, ImmigrationFile, SuccessionFile, RecipeFile) and obj.id != path.stem:
        errors.append(f"{path}: id {obj.id} does not match file name")
    if model is Subnational and obj.parent != path.stem:
        errors.append(f"{path}: parent {obj.parent} does not match file name")
    return errors


def main(argv: list[str]) -> int:
    paths = [Path(a) for a in argv] or sorted(
        [*ROOT.glob("data/jurisdictions/*.json"), *ROOT.glob("data/subnational/*.json"), *ROOT.glob("data/income/*.json"), *ROOT.glob("data/income_regions/*.json"), *ROOT.glob("data/immigration/*.json"), *ROOT.glob("data/succession/*.json"), *ROOT.glob("data/recipes/*.json")]
    )
    errors = [e for p in paths for e in validate_file(p)]
    for e in errors:
        print(e)
    print(f"{len(paths)} file(s) checked, {len(errors)} error(s)")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
