from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Profile, Skill, Project, Proposal, Contract, Message, Review

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'role', 'bio']

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
            role=validated_data.get('role', 'freelancer'),
            bio=validated_data.get('bio', '')
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    skills = serializers.SlugRelatedField(
        many=True,
        queryset=Skill.objects.all(),
        slug_field='name'
    )

    class Meta:
        model = Profile
        fields = ['id', 'user', 'skills', 'location', 'hourly_rate']


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'name']


class ProjectSerializer(serializers.ModelSerializer):
    client = UserSerializer(read_only=True)
    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'budget', 'deadline', 'status', 'client', 'created_at']


class ProposalSerializer(serializers.ModelSerializer):
    freelancer = UserSerializer(read_only=True)
    project = ProjectSerializer(read_only=True)
    class Meta:
        model = Proposal
        fields = ['id', 'project', 'freelancer', 'cover_letter', 'bid_amount', 'submitted_at', 'accepted']


class ContractSerializer(serializers.ModelSerializer):
    project = ProjectSerializer(read_only=True)
    freelancer = UserSerializer(read_only=True)
    class Meta:
        model = Contract
        fields = ['id', 'project', 'freelancer', 'start_date', 'end_date', 'amount', 'completed']


class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    receiver = UserSerializer(read_only=True)
    class Meta:
        model = Message
        fields = ['id', 'sender', 'receiver', 'content', 'timestamp', 'read']


class ReviewSerializer(serializers.ModelSerializer):
    project = ProjectSerializer(read_only=True)
    reviewer = UserSerializer(read_only=True)
    reviewee = UserSerializer(read_only=True)
    class Meta:
        model = Review
        fields = ['id', 'project', 'reviewer', 'reviewee', 'rating', 'comment', 'created_at']
