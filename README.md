# budget-tracker

A web app that helps you track your budget.  Persists data through downloading .cls files onto local machine.  You decide where & how.

Find deployed version @ https://damelody.github.io/budget-tracker/

Notes:
- Press SAVE otherwise all progress is lost!
- after SAVE it will prompt you to download each table as .cls file,
    > if you want to overwrite files, you must click on the files, otherwise it'll do the <file_name(n)> thing.
- To see an accurate savings sum, use category named Rollover for to set up Account values each month
- To separate months/years, would suggest a file directory such as the following:
    - BUDGET_TRACKER
        - <year_1>
            - January
                - Account.cls
                - Category.cls
                - Transaction.cls
            - February
                - Account.cls
                - Category.cls
                - Transaction.cls
            - etc.
        - <year_2>
            - fill in the rest...
            
- Remember, this downloads files locally, so be sure to backup the files regularly (whatever strategy works for you) so you don't potentially lose months/years of budgeting work to a technological disaster
