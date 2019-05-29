import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'questions', loadChildren: './questions/questions.module#QuestionsPageModule' },
  { path: 'answer', loadChildren: './answer/answer.module#AnswerPageModule' },
  { path: 'feedback', loadChildren: './feedback/feedback.module#FeedbackPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
