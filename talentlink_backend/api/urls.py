from django.urls import path
from .views import (
    UserCreateView, ProfileView, SkillListView,
    ProjectListCreateView, ProposalListCreateView,
    ContractListCreateView, MessageListCreateView,
    ReviewListCreateView
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # Authentication
    path('register/', UserCreateView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Profile (requires user ID)
    path('profile/<int:pk>/', ProfileView.as_view(), name='profile'),

    # Skills
    path('skills/', SkillListView.as_view(), name='skills'),

    # Projects
    path('projects/', ProjectListCreateView.as_view(), name='projects'),

    # Proposals
    path('proposals/', ProposalListCreateView.as_view(), name='proposals'),

    # Contracts
    path('contracts/', ContractListCreateView.as_view(), name='contracts'),

    # Messages
    path('messages/', MessageListCreateView.as_view(), name='messages'),

    # Reviews
    path('reviews/', ReviewListCreateView.as_view(), name='reviews'),
]
